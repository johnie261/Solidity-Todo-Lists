// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
  event AddTask(address recipient, uint taskId);
  event DeleteTak(uint taskId, bool isDeleted);

  struct Task{
    uint id;
    string taskText;
    bool isDeleted;
  }

  Task[] private tasks;
  mapping(uint256 => address) taskToOwner;

  function AddTask(string memory taskText, bool isDeleted) external {
    uint taskId = tasks.length;
    tasks.push(Task(taskId, taskText, isDeleted));
    taskToOwner[taskId] = msg.sender;
    emit AddTask(msg.sender, taskId);
  }

  function getMyTask() external view returns (Task[] memory) {
    Task[] memory temporary = new Task[]tasks.length;
  }
}
