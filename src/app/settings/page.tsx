"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/actions/profile";
import { toast } from "sonner"; // sonner install করা থাকলে, নাহলে console.log ব্যবহার করুন

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateProfile({
        displayName: formData.get("displayName") as string,
        username: formData.get("username") as string,
        bio: formData.get("bio") as string,
      });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Display Name</label>
          <Input name="displayName" placeholder="Your Name" className="bg-white/5 border-white/10" required />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Username</label>
          <Input name="username" placeholder="username" className="bg-white/5 border-white/10" required />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Bio</label>
          <Textarea name="bio" placeholder="Tell us about yourself..." className="bg-white/5 border-white/10" />
        </div>
        
        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}

