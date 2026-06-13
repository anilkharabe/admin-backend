interface UserInterface {
  name: string;
  email: string;
  password: string
  role: string;
  status: string;
  phone: number,
  address:{
    city: string,
    state: string,
    pincode: number
  },
}

export default UserInterface;