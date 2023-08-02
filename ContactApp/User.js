const Contact = require("./Contact")

class User {
  static allUsers = []
  static userID = 0
  constructor(fullname, isAdmin, gender) {
    this.ID = User.userID++
    this.fullname = fullname
    this.gender = gender
    this.isAdmin = isAdmin
    this.contacts = []
  }

  static newAdmin(fname, lname, gender, age) {
    if (typeof (fname) != 'string') {
      return "Invalid First Name"
    }
    if (typeof (lname) != 'string') {
      return "Invalid Last Name"
    }

    if (typeof (gender) != "string") {
      return "inavalid gender"
    }
    if (typeof (age) != "number") {
      return "inavalid number"
    }

    let fullname = fname + " " + lname
    return new User(fullname, true, gender)
  }

  newUser(fname, lname, gender, age) {
    if (typeof (fname) != 'string') {
      return "Invalid First Name"
    }
    if (typeof (lname) != 'string') {
      return "Invalid Last Name"
    }
    if (typeof (gender) != "string") {
      return "inavalid gender"
    }
    if (typeof (age) != "number") {
      return "inavalid number"
    }
    if (!this.isAdmin) {
      return "Not Admin"
    }

    let fullname = fname + " " + lname
    let user = new User(fullname, false, gender, age)
    User.allUsers.push(user)
    return user
  }

  getAllUsers() {
    if (!this.isAdmin) {
      return " Admin Can Access"
    }
    return User.allUsers
  }

  findUser(ID) {
    // if (!this.isAdmin){
    //     return "Accessible to Administrators Only"
    // }
    for (let i = 0; i < User.allUsers.length; i++) {
      if (User.allUsers[i].ID == ID) {
        return [i, true]
      }
    }
    return [-1, false]
  }

  updateUser(ID, parameter, newValue) {
    if (!this.isAdmin) {
      return "Accessible to Administrators Only"
    }
    let [index, result] = this.findUser(ID)
    if (!result) {
      return "User Not Found"
    }

    switch (parameter) {
      case "fullname":
        if (typeof (newValue) != 'string') {
          return "Invalid Name"
        }
        User.allUsers[index].fullname = newValue
        return User.allUsers[index]
      case "gender":
        if (typeof (gender) != 'string') {
          return "Invalid gender"
        }
        User.allUsers[index].gender = newValue
        return User.allUsers[index]
      case "age":
        if (typeof (age) != 'number') {
          return "Invalid Name"
        }
        User.allUsers[index].age = newValue
        return User.allUsers[index]
      default:
        return "Invalid Parameter"
    }

  }

  deleteUser(ID) {
    if (!this.isAdmin) {
      return " Only Admin can access"
    }
    let [index, result] = this.findUser(ID)
    if (!result) {
      return "User Not Found"
    }

    User.allUsers.splice(index, 1)
    return " Deleted Successfully"
  }

  CreatContact(fullname, country) {
    if (typeof (fullname) != 'string') {
      return "Invalid Fullname"
    }
    if (typeof (country) != 'string') {
      return "Invalid Country"
    }
    if (this.isAdmin) {
      return "Only Users can create new contacts"
    }

    let userContact = new Contact(fullname, country)
    this.contacts.push(userContact)
    return userContact
  }

  readContacts() {
    if (this.isAdmin) {
      return "Only Users can access contacts"
    }
    return this.contacts
  }

  findContact(ID) {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].ID == ID) {
        return [i, true]
      }
    }
    return [-1, false]
  }

  updateContact(ID, parameter, newValue) {
    if (this.isAdmin) {
      return "Only Users can access contacts"
    }

    let [index, isContact] = this.findContact(ID)

    if (!isContact) {
      return "Contact Not Found"
    }

    let modifiedContact = this.contacts[index].updateContact(parameter, newValue)
    return modifiedContact
  }

  deleteContact(ID) {
    if (this.isAdmin) {
      return "Only Users can access contacts"
    }
    let [index, result] = this.findContact(ID)
    if (!result) {
      return "Contact Not Found"
    }

    this.contacts.splice(index, 1)
    return "Contact Deleted Successfully"
  }

  CreatContactInfo(ID, PhoneNumber, EmailID) {
    if (this.isAdmin) {
      return "Admin cannot create Contact details"
    }

    let [index, result] = this.findContact(ID)
    if (!result) {
      return "Contact Not Found"
    }

    let infoObj = this.contacts[index].newContactInfo(PhoneNumber, EmailID)
    return infoObj
  }

  getAllInfo(ID) {
    if (this.isAdmin) {
      return "Only Users can access Contacts-Info"
    }

    let [index, result] = this.findContact(ID)
    if (!result) {
      return "Contact Not Found"
    }
    return this.contacts[index].contactInfo
  }

  updateContactInfo(ID, infoID, PhoneNumber, EmailID) {
    if (this.isAdmin) {
      return "Only Users can access Contacts-Info"
    }

    let [index, result] = this.findContact(ID)
    if (!result) {
      return "Contact Not Found"
    }
    let info = this.contacts[index].updateContactInfo(ID,infoID, PhoneNumber, EmailID)
    return info
  }

  deleteContactInfo(ID, infoID) {
    if (this.isAdmin) {
      return "Only Users can access Contacts-Info"
    }

    let [index, result] = this.findContact(ID)
    if (!result) {
      return "Contact Not Found"
    }
    let info = this.contacts[index].deleteContactInfo(infoID)
    return info
  }

  getUserByID(userID) {
    if (!this.isAdmin) {
      return "Accessible to Administrators Only"
    }
    let [index, result] = this.findUser(userID)
    if (!result) {
      return "User Not Found"
    }
    return User.allUsers[index]
  }

  getContactByID(contactID) {
    if (this.isAdmin) {
      return "Only Users can access contacts"
    }

    let [index, result] = this.findContact(contactID)

    if (!result) {
      return "Contact Not Found"
    }
    return this.contacts[index]
  }

  getContactInfoByID(contactID, infoID) {
    if (this.isAdmin) {
      return "Only Users can access Contacts-Info"
    }

    let [index, result] = this.findContact(contactID)
    if (!result) {
      return "Contact Not Found"
    }
    let info = this.contacts[index].getContactInfoByID(infoID)
    return info
  }
}

let adm1 = User.newAdmin("Rahul", "Saha", "F", 23)
let user1= adm1.newUser("Ritik", "Saha", "M", 22)
let user2= adm1.newUser("Aman", "Saha", "M", 17)
console.log(adm1.getAllUsers());



let deleteuser1 = adm1.deleteUser(2)
console.log(deleteuser1);
let updateContact=adm1.updateContact(2)
console.log((updateContact));

console.log(adm1.getAllUsers());

console.log(user1.CreatContact("vikas", "IND"));
console.log(user1.CreatContact("gaurav", "USD"));
console.log(user1.CreatContact("shivam", "AUS"));

console.log("All Users: ", user1.readContacts());
console.log("All Users: ", user1.deleteContact(2));
console.log("All Users: ", user1.readContacts());


console.log("___________");
console.log("INdex 1 info: ", user1.CreatContactInfo("1", "name", "vikas"));
console.log("INdex 1 info: ", user1.CreatContactInfo("1", "number", "7030087461"));
console.log("INdex 1 info: ", user1.CreatContactInfo("1", "role", "Email"));

console.log("All info:", user1.getAllInfo(1));
console.log(user1.updateContactInfo(1, 0, "infoValue", "Rahul"));


console.log("Deleted", user1.deleteContactInfo(1, 0));
console.log("All info:", user1.getAllInfo(1));

console.log("info by Id", user1.getContactInfoByID(1, 2))


