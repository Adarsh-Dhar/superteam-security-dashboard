import { ArrowRightIcon, TrophyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CTFsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Capture The Flag</h1>
        <p className="text-muted-foreground mt-2">Test your security skills with Solana CTF challenges</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-yellow-500" />
                Wormhole Challenge
              </CardTitle>
              <Badge>Beginner</Badge>
            </div>
            <CardDescription>Learn about signature verification vulnerabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              In this challenge, you'll learn how the Wormhole exploit worked by attempting to bypass signature
              verification in a simplified bridge contract.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-1">
              Start Challenge <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-yellow-500" />
                Price Oracle Manipulation
              </CardTitle>
              <Badge>Intermediate</Badge>
            </div>
            <CardDescription>Exploit a vulnerable price oracle implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Based on the Mango Markets exploit, this challenge tasks you with manipulating a price oracle to extract
              value from a lending protocol.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-1">
              Start Challenge <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-yellow-500" />
                Account Validation
              </CardTitle>
              <Badge>Advanced</Badge>
            </div>
            <CardDescription>Find and exploit account validation vulnerabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Inspired by the Cashio exploit, this challenge requires you to identify and exploit faulty account
              validation in a stablecoin protocol.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-1">
              Start Challenge <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
        <Card>
          <CardHeader>
            <CardTitle>Top Security Researchers</CardTitle>
            <CardDescription>Participants who have completed the most challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Rank</th>
                    <th className="text-left py-3 px-4">Username</th>
                    <th className="text-left py-3 px-4">Challenges Completed</th>
                    <th className="text-left py-3 px-4">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">0xSolHunter</td>
                    <td className="py-3 px-4">12</td>
                    <td className="py-3 px-4">1,250</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4">CryptoNinja</td>
                    <td className="py-3 px-4">10</td>
                    <td className="py-3 px-4">980</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">3</td>
                    <td className="py-3 px-4">BlockchainWizard</td>
                    <td className="py-3 px-4">9</td>
                    <td className="py-3 px-4">875</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">SolanaExplorer</td>
                    <td className="py-3 px-4">8</td>
                    <td className="py-3 px-4">760</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">5</td>
                    <td className="py-3 px-4">RustHacker</td>
                    <td className="py-3 px-4">7</td>
                    <td className="py-3 px-4">690</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Leaderboard
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming CTF Events</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Solana Security Summit CTF</CardTitle>
              <CardDescription>June 15-16, 2023 • Virtual Event</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A two-day CTF event featuring challenges based on real-world Solana exploits. Compete for prizes and
                learn about Solana security.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Register Now
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Superteam Security Challenge</CardTitle>
              <CardDescription>August 10-12, 2023 • Virtual Event</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A three-day event focused on finding vulnerabilities in popular Solana protocols. Participate to win
                prizes and recognition.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
