
export const initialStore = () => ({
  contacts: []  
});


export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload
      };

    case "ADD_CONTACT":
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case "UPDATE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };

    case "DELETE_CONTACT":
      return {
        ...store,
        contacts: store.contacts.filter(contact =>
          contact.id !== action.payload
        )
      };

    default:
      throw new Error('Unknown action.');
  }
}
