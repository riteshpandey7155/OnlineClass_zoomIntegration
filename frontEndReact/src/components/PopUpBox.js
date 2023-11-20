import React from 'react';
import { toast } from 'react-toastify';

function MyComponent() {
  const notify = () => toast.success('Done, You have ');

  return (
    <div>
      {/* Your component content goes here */}
      <button onClick={notify}>Show Toast</button>
    </div>
  );
}

export default MyComponent;