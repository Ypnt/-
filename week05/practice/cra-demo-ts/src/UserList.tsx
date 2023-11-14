const users = [
    { id: 1, name: 'Alice', age: 24 },
    { id: 2, name: 'Bob', age: 28 },
    { id: 3, name: 'Charlie', age: 75},
  ];
export default function UserList(){
    return(
        <ul>
            {users.map(item=><li key={item.id}>status: {item.age<70? <div>name: {item.name} age: {item.age}</div> : <div>name: {item.name} age: {item.age}<span>老人</span></div>}</li>)}
        </ul>
    )
}