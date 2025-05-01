function SignIn() {
  const isIn = true;
  if (!isIn) {
    return <button className='btn'>Sign in</button>;
  } else {
    return <button className='btn btn-soft btn-accent'>Profile</button>;
  }
}

export default SignIn;
