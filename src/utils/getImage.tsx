import axios from "axios";

interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

const API_KEY = "44761113-208b312ff870546ec40cfb95a";

async function searchImages(query: string): Promise<PixabayImage[]> {
  try {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo`;
    const response = await axios.get<PixabayResponse>(url);
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    return [];
  }
}

export default searchImages;
