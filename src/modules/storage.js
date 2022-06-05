// export let goalListStorage = ['Fitness', 'Coding', 'Personal'];

export const goalListStorage = {
  set add(name) {
    this.goals.push(name);
  },
  set delete(name) {
    const newGoalsArray = this.goals.filter((goal) => goal != name);
    console.log(newGoalsArray);
    this.goals = newGoalsArray;
  },
  goals: ['Personal', 'Coding', 'Fitness'],
};

export let toDoStorage = [
  {
    title: 'Gym',
    description: 'We go Jim',
    dueDate: '22 June 2022',
  },
];

export class toDoItem {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

// // new to do
// const newToDo = new toDoItem('Test', 'Testing this', '11 June 2022', false);

// toDoStorage.push(newToDo);

// const newToDo2 = new toDoItem(
//   'Test2222',
//   'Testing this',
//   '11 June 2022',
//   false
// );

// toDoStorage.push(newToDo2);

// console.log(toDoStorage);
