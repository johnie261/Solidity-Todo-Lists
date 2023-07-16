import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { TaskContractAddress } from '../config.js' 
import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try{
      const {ethereum} = window
        if(!ethereum) {
          console.log('Metamask not detected')
          return
        }
      let chainId = await ethereum.request({method: 'eth_chainId'})
      console.log('connect to chain:', chainId)

      const rinkebyChainId = '0x539'
      if(chainId !== rinkebyChainId) {
        alert('You are not connect to rinkeby textnet!')
        setCorrectNetwork(false)
      } else {
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'})
      console.log('Found accounts', accounts[0])
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])
      
    } catch(error) {
      console.log(error)
    }

  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const {ethereum} = window
      if(ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        let allTasks = await TaskContract.getMyTask()
        setTasks(allTasks)
      } else {
        console.log('ethereum object does not exist')
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault()

    let task = {
      taskText: input,
      isDeleted: false
    }

    try {
      const {ethereum} = window
      if(ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        await TaskContract.addTask(task.taskText, task.isDeleted)
          setTasks((prevTask) => [...prevTask, task])
          console.log('Added task')
      } else {
        console.log('Ethereum object doest exist')
      }
    } catch(error) {
      console.log(error)
    }
   setInput('')
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {
    try{
      const {ethereum} = window
      if(ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        const deletedTaskTx = await TaskContract.deleteTask(key, true)
        console.log('successfully deleted', deletedTaskTx)

        let allTasks = await TaskContract.getMyTask()
        setTasks(allTasks)        
      } else {
        console.log('Ethereum does not exist')
      }
    } catch(error) {
      console.log(error)
    }
  }

   useEffect(() => {
    getAllTasks()
  }, [])

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!isUserLoggedIn ? <ConnectWalletButton connectWallet={connectWallet} /> :
        correctNetwork ? <TodoList tasks={tasks} input={input} setInput={setInput} addTask={addTask} deleteTask={deleteTask}/> : <WrongNetworkMessage />}
    </div>
  )
}

