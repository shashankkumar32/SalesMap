'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; // For routing in Next.js
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Circles } from "react-loader-spinner";

const API_URL = "https://pos-backend-jwt-auth.onrender.com/api/auth";

const TabsDemo = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [loading, setLoading] = useState(false); // To track loading status
  const router = useRouter(); // Next.js router for navigation

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setAuthMessage("Login successful");
      router.push("/home"); // Redirect to the /home page
    } catch (error) {
      setAuthMessage("Login failed");
      console.error("Login error", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleRegister = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
      });
      console.log(response);
      setAuthMessage("Registration successful, please log in.");
    } catch (error) {
      setAuthMessage("Registration failed");
      console.error("Registration error", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDummyLogin = () => {
    // Fill in dummy credentials
    setUsername("shashankthestar3@gmail.com");
    setPassword("shashank");
  };

  return (
    <div className="w-full flex justify-center">
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Circles
            height="80"
            width="80"
            color="#BD8AFF"
            ariaLabel="loading-indicator"
          />
        </div>
      )}

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Log into your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-red-500">{authMessage}</div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button onClick={handleLogin} disabled={loading}>
                Login
              </Button>
              <Button onClick={handleDummyLogin} className="ml-4" disabled={loading}>
                Use Dummy Credentials
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create a new account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-red-500">{authMessage}</div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegister} disabled={loading}>
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsDemo;
