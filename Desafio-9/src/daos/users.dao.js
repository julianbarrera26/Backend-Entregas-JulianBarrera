class UsersManager {
    constructor() {
      this.users = [];
    }
  
    getAll() {
      return this.users;
    }
  
    getById(id) {
      const user = this.users.find((u) => u.id === id);
      return user;
    }
  
    createOne(obj) {
      const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
      const newUser = { id, ...obj };
      this.users.push(newUser);
      return newUser;
    }
  }
  
  export const usersManager = new UsersManager();