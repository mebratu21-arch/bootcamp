async function getuser()
{
    try
    {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!response.ok)
        {
            throw new Error("Error");
        }
        const data = await response.json();
        return data;
        
    }
}