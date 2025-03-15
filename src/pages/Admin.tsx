
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import FileList from "@/components/FileList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-bteb-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Manage result files and system settings
            </p>
          </div>
          
          <Tabs defaultValue="results" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="results">Result Files</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Result File</CardTitle>
                    <CardDescription>
                      Upload PDF files containing student results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploader />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Result Files</CardTitle>
                    <CardDescription>
                      View and manage uploaded result files
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileList />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    System settings will be implemented in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
