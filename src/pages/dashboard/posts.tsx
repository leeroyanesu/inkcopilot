import { useQuery } from "@tanstack/react-query"
import { getPosts, Post as PostType } from "@/lib/api/posts"
import {  
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Eye, Edit, Trash, X } from "lucide-react"
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { AppSidebar } from "@/components/app-sidebar"

interface GroupedPosts {
  articles: PostType[];
  news: PostType[];
  posts: PostType[];
}

const defaultGroupedPosts: GroupedPosts = {
  articles: [],
  news: [],
  posts: []
}

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = React.useState<PostType | null>(null)
  const [currentType, setCurrentType] = React.useState("articles")

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts', { type: currentType }],
    queryFn: () => getPosts({ type: currentType === 'articles' ? 'article' : currentType.slice(0, -1) })
  })

  const PostsTable = ({ posts }: { posts: PostType[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id} className="cursor-pointer" onClick={() => setSelectedPost(post)}>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell>{format(new Date(post.createdAt), 'yyyy-MM-dd')}</TableCell>
            <TableCell className="text-muted-foreground">
              {post.status === 'published' ? format(new Date(post.publishedAt!), 'yyyy-MM-dd') :
               post.status === 'scheduled' ? format(new Date(post.scheduledFor!), 'yyyy-MM-dd') : 
               post.status}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="ml-4 text-2xl font-semibold">Posts</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Tabs value={currentType} onValueChange={setCurrentType} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="articles">
                  Articles {postsData?.counts.articles ? `(${postsData.counts.articles})` : ''}
                </TabsTrigger>
                <TabsTrigger value="news">
                  News {postsData?.counts.news ? `(${postsData.counts.news})` : ''}
                </TabsTrigger>
                <TabsTrigger value="posts">
                  Posts {postsData?.counts.posts ? `(${postsData.counts.posts})` : ''}
                </TabsTrigger>
              </TabsList>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading...</div>
              </div>
            ) : (
              <>
                <TabsContent value="articles">
                  <PostsTable posts={postsData?.posts || []} />
                </TabsContent>
                <TabsContent value="news">
                  <PostsTable posts={postsData?.posts || []} />
                </TabsContent>
                <TabsContent value="posts">
                  <PostsTable posts={postsData?.posts || []} />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </SidebarInset>

      {/* Right Sidebar for Post Preview */}
      {selectedPost && (
        <div className="fixed inset-y-0 right-0 w-96 border-l bg-background">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <h2 className="text-lg font-semibold">Post Preview</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedPost(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] p-4">
            <Card>
              <CardHeader>
                <CardTitle>{selectedPost.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Created: {format(new Date(selectedPost.createdAt), 'MMM d, yyyy')}</span>
                  <span>·</span>
                  <span>Status: {selectedPost.status}</span>
                  {selectedPost.publishedAt && (
                    <>
                      <span>·</span>
                      <span>Published: {format(new Date(selectedPost.publishedAt), 'MMM d, yyyy')}</span>
                    </>
                  )}
                  {selectedPost.scheduledFor && (
                    <>
                      <span>·</span>
                      <span>Scheduled: {format(new Date(selectedPost.scheduledFor), 'MMM d, yyyy')}</span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPost.metadata?.description && (
                    <div>
                      <h3 className="font-medium mb-1">Description</h3>
                      <p className="text-sm text-muted-foreground">{selectedPost.metadata.description}</p>
                    </div>
                  )}
                  
                  {selectedPost.metadata?.category && (
                    <div>
                      <h3 className="font-medium mb-1">Category</h3>
                      <Badge>{selectedPost.metadata.category}</Badge>
                    </div>
                  )}
                  
                  {selectedPost.metadata?.tags && selectedPost.metadata.tags.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-1">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.metadata.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="prose prose-sm max-w-none mt-4">
                    {selectedPost.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
      )}
    </SidebarProvider>
  )
}
