const http = require("./app");

const PORT = process.env.PORT || 3005;

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));





