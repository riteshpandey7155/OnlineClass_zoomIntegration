
export default function Input({placeholder,children ,...props}){
    
    
    return(
        <div className="mb-4">
              <label className="block text-gray-700 text-2x1  font-semibold mb-2" htmlFor="myInput">{children}</label>
        <input  id="myInput" className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...props} placeholder={placeholder}
         />
        </div>
    )
}