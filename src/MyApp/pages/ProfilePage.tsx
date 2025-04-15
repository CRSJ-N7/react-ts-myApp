const ProfilePage = () => {

const user = localStorage.getItem('user')?.replace('"', '').replace('"','') || null;
const email = localStorage.getItem('email')?.replace('"', '').replace('"', '') || null;
const id = localStorage.getItem('id') || null;

  return (
    
    <div>
      <h1>Username: {user} </h1>
      <h1>id: {id} </h1>
      <h1>email: {email}</h1>

    </div>
  )
}

export default ProfilePage;