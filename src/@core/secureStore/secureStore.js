import SecureLS from 'secure-ls'

export default function ss () {
  const st = new SecureLS({encodingType: 'aes'})
  return  {
    st
  }
  
}
