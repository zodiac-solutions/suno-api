export interface InitialValues1 {
  title: string;
  genre: string;
  prompt: string;
}

export interface InitialValues2 {
  name: string;
  email: string;
}

export interface CreatedSong {
  id: string;
  title: string;
  image_url: string;
  lyric: string;
  audio_url: string;
  video_url: string;
  created_at: string;
  model_name: string;
  status: string;
  gpt_description_prompt: string;
  prompt: string;
  type: string;
  tags: string;
}
