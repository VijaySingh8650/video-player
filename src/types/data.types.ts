export interface DataTypeI {
    categories: CategoryI[]
  }
  
export interface CategoryI {
    name: string
    videos: VideoI[]
}
  
export interface VideoI {
    description: string
    sources: string[]
    subtitle: string
    thumb: string
    title: string
}