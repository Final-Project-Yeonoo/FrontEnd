import './App.css';

function App() {
  return (
   <>
   <Routers>

    <Route path="/" element={<Dashboard/>} />

    <Route path="/login" element={<Login/>} />


    <Route path="/user" element={<AdminUser/>} />
    

    
   </Routers>
   </>
  );
}

export default App;
