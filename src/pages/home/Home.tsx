import { useNavigate } from "react-router-dom";
import Logoicon from "../../components/icons/Logoicon";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

interface Note {
  _id: string;
  title: string;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }
  
  const storedUser = localStorage.getItem('user');
  let user = null;
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
    }
  }

  const [isNotesLoading, setIsNotesLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [notes, setNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  const handleOpen = () => {
    setOpen(true)
    setMessage('');
  };
  const handleClose = () => {
    setOpen(false);
    setMessage('');
  }


  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleGetNotes = async () => {
    setIsNotesLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/note/getall/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotes(response.data.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "An error occurred");
      } else {
        const genericError = error as Error;
        showMessage(genericError.message || "An unexpected error occurred");
      }
    } finally {
      setIsNotesLoading(false);
    }
  }


  const handleCreateNote = async () => {
    setIsCreatingNote(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/note/create/${user.id}`,
        { title: newNoteTitle, },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }

      );
      if (response.status === 201) {
        setNewNoteTitle('');
        handleClose();
        handleGetNotes();
        showMessage("New Note Added!")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message || "An error occurred");
      } else {
        const genericError = error as Error;
        showMessage(genericError.message || "An unexpected error occurred");
      }
    } finally {
      setIsCreatingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/note/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setMessage("Note Deleted successfully!");
      }
      showMessage("Note removed!")
      handleGetNotes()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message || "An error occurred");
      } else {
        const genericError = error as Error;
        showMessage(genericError.message || "An unexpected error occurred");
      }
    }
  };



  useEffect(() => {
    handleGetNotes()
  }, [])

  return (
    <div className="md:h-full p-3">
      <div className="h-full p-1 md:p-4">
        <div className="logo flex place-items-center justify-between">
          <div className="flex place-items-center">
            <Logoicon />
            <div className="text-[20px] md:text-[24px] font-[500] md:font-[600] pl-10">
              Dashboard
            </div>
          </div>
          <div className="text-[14px] md:text-[16px] font-[500] md:font-[600] text-[#367AFF] underline" onClick={signOut}>
            Sign Out
          </div>
        </div>
        <div className="md:flex w-full md:justify-center md:items-center">
          <div className="md:min-w-2xl lg:min-w-2xl md:px-4">
            <div className="border-1 rounded-2xl border-gray-200 p-4 flex flex-col items-start justify-center my-12 shadow-xl">

              <p className="text-[22px] font-[700] md:text-[32px] text-[#232323] ">Welcome, {user.name}</p>

              <p className="text-[18px] md:text-[22px] font-[400] text-[#969696] py-4 ">Email: {user.email}</p>
            </div>

            <div className="mt-10">
              <button
                className="w-full rounded-md bg-[#367AFF] py-2 px-4 border border-transparent text-center text-[16px] md:text-[18px] text-white font-[600] transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleOpen}
              >Add Note </button>
              <div className="h-5 mt-4">
                {message && (
                  <div className={`pt-1 pb-3 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                  </div>
                )}
              </div>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center text-[24px] font-bold mb-4">
                    Add Note
                  </Typography>
                  <div className="pt-1 pb-3">
                    <TextField
                      id="note-title"
                      label="Note Title"
                      variant="outlined"
                      className="w-full"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                    />
                  </div>
                  <div className="pt-1 pb-3">
                    <button
                      className="w-full rounded-md bg-[#367AFF] py-2 px-4 border border-transparent text-center text-[16px] md:text-[18px] text-white font-[600] transition-all shadow-md hover:shadow-lg  focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={handleCreateNote}
                      disabled={isCreatingNote || !newNoteTitle}
                    >
                      {isCreatingNote ? "Creating..." : "Add"}
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
            <div className="my-4">
              <div className="text-[20px] md:text-[25px] font-[400] text-left mb-3">Notes</div>
              <div>
                {isNotesLoading ? <>Loading...</> :
                  <>
                    {notes.length === 0 ? (
                      <p className="text-gray-500">No notes found.</p>
                    ) : (
                      notes.map((note, index) => (
                        <div
                          key={index}
                          className="border rounded-2xl border-gray-200 p-4 flex items-start justify-between shadow-lg mb-4"
                        >
                          <h3 className="text-[16px] md:text-[20px] font-[400]">
                            {note.title}
                          </h3>
                          <div onClick={() => handleDeleteNote(note._id)}>
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                          </div>
                        </div>
                      ))
                    )}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home