// const argv = require("yargs").argv;
const { program } = require("commander");
// const { Command } = require("commander");
// const program = new Command();

const { contacts } = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log("allContacts: ", allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log("contact: ", contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    case "update":
      const updatedContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

// program.parse(process.argv);
program.parse();

const argv = program.opts();

invokeAction(argv);
// invokeAction({ action: "list" });

// invokeAction({ action: "get", id: "2" });

// invokeAction({
//   action: "add",
//   name: "Robert Deniro",
//   email: "robert.deniro@google.com",
//   phone: "(592) 222-3344",
// });

// invokeAction({
//   action: "update",
//   id: "2f435fff-e3a0-466a-9ac8-fdb99e57825f",
//   name: "Donald Trump",
//   email: "donald.trump@google.com",
//   phone: "(592) 222-3344",
// });

// invokeAction({ action: "remove", id: "797dc810-afa9-4d75-bcfa-e1d4c0bf617c" });
