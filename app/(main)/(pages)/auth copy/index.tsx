// 'use client'
// import { useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";



// // Replace with your actual backend API URL
// const API_URL = "http://localhost:5000/api/users";

// const AuthBox=()=> {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [authMessage, setAuthMessage] = useState("");

//   // Function to handle login
//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, {
//         username,
//         password,
//       });
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);
//       // localStorage.setItem('username',username)
//       // setAuthMessage("Login successful");
//       // You can redirect the user to the dashboard after successful login
//     } catch (error) {
//       setAuthMessage("Login failed");
//       console.error("Login error", error);
//     }
//   };

//   // Function to handle registration
//   const handleRegister = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, {
//         username,
//         password,
//       });
//       setAuthMessage("Registration successful, please log in.");
//     } catch (error) {
//       setAuthMessage("Registration failed");
//       console.error("Registration error", error);
//     }
//   };

//   return (
//     <Tabs defaultValue="account" className="w-[400px]">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="login">Login</TabsTrigger>
//         <TabsTrigger value="register">Register</TabsTrigger>
//       </TabsList>

//       {/* Login Tab */}
//       <TabsContent value="login">
//         <Card>
//           <CardHeader>
//             <CardTitle>Login</CardTitle>
//             <CardDescription>Log into your account.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="space-y-1">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="text-red-500">{authMessage}</div>
//           </CardContent>
//           <CardFooter>
//             <Button onClick={handleLogin}>Login</Button>
//           </CardFooter>
//         </Card>
//       </TabsContent>

//       {/* Register Tab */}
//       <TabsContent value="register">
//         <Card>
//           <CardHeader>
//             <CardTitle>Register</CardTitle>
//             <CardDescription>Create a new account.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="space-y-1">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//             <div className="space-y-1">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="text-red-500">{authMessage}</div>
//           </CardContent>
//           <CardFooter>
//             <Button onClick={handleRegister}>Register</Button>
//           </CardFooter>
//         </Card>
//       </TabsContent>
//     </Tabs>
//   );
// }

// export default AuthBox