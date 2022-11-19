import { useState } from 'react';
import './Feedback.css';
import Star from './Star';
import {
    Container,
    TextField,Button 
  } from "@mui/material";
const Feedback = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            item: "Steak"
        },
        {
            id: 2,
            item: "Chicken"
        },
        {
            id: 3,
            item: "Pork"
        }
    ]);

    return (
        <main>
            <header className="header3">
                <h3>Food Feedback: </h3>
                <br></br>
                <h5> &nbsp; Rate our Food to help us do better! </h5>
            </header>
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        <li className="item" key={item.id}>
                            <p>{item.item+":"}</p><p>&nbsp;</p> <Star/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
            {/* <CommentBox/> */}
            <header className="header2">
                <h3>Overall Feedback: </h3>
            </header>
            <ul >
                <li className="allitem"><h5>Food:&nbsp; </h5> <Star/></li>
                <li className="allitem"><h5>Price:&nbsp; </h5> <Star/></li>
                <li className="allitem"><h5>Environment:&nbsp; </h5> <Star/></li>
                <li className="allitem"><h5>Timing:&nbsp; </h5> <Star/></li>
                <li className="allitem"><h5>Overall:&nbsp; </h5> <Star/></li>
            </ul>
            <Container sx={{padding:"10px"}}>
                <div>
                    <h3 style={{color: "#F49D1A",}}>Additional Comments:</h3>
                    <TextField
                    id="outlined-textarea"
                    label=""
                    placeholder="Welcome to provide additional feedback for our restaurant.."
                    rows={3}
                    multiline
                    fullWidth
                    />
                    <Button style={{
                        borderRadius: 40,
                        color: "aliceblue",
                        backgroundColor: "green",
                        margin: "9px",
                        padding: "15px 30px",
                        fontSize: "15px"
                    }}>Submit</Button>
                    <Button style={{
                        borderRadius: 40,
                        color: "aliceblue",
                        margin: "9px",
                        backgroundColor: "coral",
                        padding: "15px 30px",
                        fontSize: "15px"
                    }}>Cancel</Button>
                </div>
            </Container>
        </main>
    )
}

export default Feedback
