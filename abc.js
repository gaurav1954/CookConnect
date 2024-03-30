const fun = async () => {
    const apiUrl = `http://localhost:8000/recipes/like-status`; // API endpoint to get like status
    const response = await fetch(apiUrl, {
        method: 'GET',
    });
    const data = await response.json();
    console.log(!data.one);
}
fun()