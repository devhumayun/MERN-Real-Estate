import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const ContactComponent = ({listing}) => {
  const [landLord, setLandLord ] = useState([])
  const [message, setMessage ] = useState("")
    useEffect(() => {
        const landLoardInfo = async () => {
          try {
            const res = await fetch(`/api/v1/user/${listing.userRef}`);
            const data = await res.json();
            if (data.success === false) {
              console.log(data.message);
              return;
            }
            setLandLord(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        landLoardInfo();
    }, [listing]);
  
    return (
    <main>
      <p> Contact this <strong>{landLord.username}</strong> for the <strong>{listing.name}</strong></p>
      <textarea className="my-3 w-full p-3 rounded-lg outline-none" placeholder="Type your message" name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <Link className="bg-slate-900 w-full block text-white text-center p-3 uppercase rounded-lg font-semibold" to={`mailto:${listing.email}?subject=Regarding ${listing.name}&body=${message}`}> Send Message </Link>
    </main>
  )
}

export default ContactComponent
