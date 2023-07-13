import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'

/*
  1. front-end walkthrough
  2. install truffle
  3. create backend folder
  4. truffle init
  5. truffle create contract TaskContract
  6. Write the Smart Contract (LOGIC)
  7. Rename Migrations to TaskContract
  8. Download ZIP for Entire Project
  9. `yarn global add truffle` in local CLI
  10. cd into backend folder
  11. truffle dashboard
  12. connect metamask to truffle page on localhost
  13. open new tab in terminal
  14. truffle migrate --network dashboard
  15. Copy contract address from web page
  16. Go back to REPLIT
  17. cd into backend
  18. truffle compile
  19. create `config.js` inside of client folder
  20. add export const TaskContractAddress in `config.js`
  21. import TaskAbi into client index.js from TaskContract.json located in backend
  22. Complete Connect wallet function
  23. complete Add task function
  24. Complete Get All Tasks function
  25. Complete delete all tasks function
*/

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {

  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {

  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {

  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!'is user not logged in?' ? <ConnectWalletButton /> :
        'is this the correct network?' ? <TodoList /> : <WrongNetworkMessage />}
    </div>
  )
}

