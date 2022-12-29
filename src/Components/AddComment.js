import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from './firebase';
function AddComment({userData,postData}) {
    console.log(userData)
    console.log(postData)
    const [text,setText] = useState('')
    const handleClick = () => {
        if(text == ' '){
            return;
        }
        let obj = {
            text:text,
            uProfileImage:userData.profileUrl,
            uName : userData.fullName
        }
    
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,doc.id]
            })
            console.log('comment updated')
        })
        setText('')
    }
    console.log('add comment run')
    return (
        <div style={{width:'100%'}}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{width:'70%'}} value={text} onChange={(e)=>setText(e.target.value)}/>
            <Button variant="contained" onClick={handleClick}>Post</Button>
        </div>
    )
}

export default AddComment