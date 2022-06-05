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

// storageTest.add = 'Test';
// console.log(storageTest.goalListStorage);
// storageTest.delete = 'Fitness';
// console.log(storageTest.goalListStorage);

// storageTest.current = 'FA';
// storageTest.current = 'TEST';
