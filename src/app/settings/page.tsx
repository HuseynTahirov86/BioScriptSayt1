'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Fingerprint, Server, Wifi } from "lucide-react";

export default function SettingsPage() {
    const { toast } = useToast();

    const handleTestFingerprint = () => {
        toast({
            title: "Testing Sensor...",
            description: "Pinging fingerprint scanner.",
        });
        setTimeout(() => {
            toast({
                title: "Sensor Test Complete",
                description: "Fingerprint sensor is connected and responding correctly.",
            });
        }, 2000);
    }

    const handleCheckConnection = () => {
        toast({
            title: "Checking Connection...",
            description: "Pinging database server.",
        });
        setTimeout(() => {
            toast({
                title: "Connection Successful",
                description: "Secure connection to the database has been established.",
            });
        }, 2000);
    }


    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">System Settings</CardTitle>
                    <CardDescription>
                        Manage system hardware and connection settings. These are simulated actions for demo purposes.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Fingerprint className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="font-semibold">Fingerprint Sensor</h3>
                                <p className="text-sm text-muted-foreground">Perform a diagnostic test on the connected sensor.</p>
                            </div>
                        </div>
                        <Button onClick={handleTestFingerprint} variant="outline">Test Sensor</Button>
                    </div>
                     <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Server className="w-8 h-8 text-primary" />
                            <div>
                                <h3 className="font-semibold">Server Connection</h3>
                                <p className="text-sm text-muted-foreground">Verify the connection to the main database server.</p>
                            </div>
                        </div>
                        <Button onClick={handleCheckConnection} variant="outline">Check Connection</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
