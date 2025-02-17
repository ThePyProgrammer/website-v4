import { ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Recommendation } from "@/types/work"

export function RecommendationCard(recc: Recommendation) {
    // Create a fallback for the avatar in case name is undefined
    const avatarFallback = recc.name ? recc.name.charAt(0).toUpperCase() : "?"
  
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={recc.avatarUrl} alt={recc.name || "Recommender"} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{recc.name || "Anonymous"}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {recc.currentJob ? <><b>Previously</b>: {recc.role}</> : recc.role }
              </p>
              
              {recc.currentJob && (
                <p className="text-sm text-muted-foreground mt-1"><b>Currently</b>: {recc.currentJob}</p>
              )}
                {/* <Badge variant="secondary" className="mt-1">
                  {recc.relationship}
                </Badge> */}
            </div>
          </div>
          <blockquote className="mt-4 text-sm italic text-muted-foreground">
            <p>{recc.recommendation}</p>
          </blockquote>
        </CardContent>
        {recc.link && (
          <CardFooter>
            <a
              href={recc.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-sm hover:underline"
            >
              Find { recc.firstName || recc.name.split(" ")[0] } on LinkedIn
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </CardFooter>
        )}
      </Card>
    )
}