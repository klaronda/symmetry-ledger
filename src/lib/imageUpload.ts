import { supabase } from './supabase';

/**
 * Upload an image file to Supabase Storage (site-assets bucket)
 * @param file - File object to upload
 * @param path - Path in the bucket (e.g., 'hero-image.webp' or 'about/professional-photo.jpg')
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  path: string
): Promise<{ url: string; error: null } | { url: null; error: Error }> {
  try {
    // Upload file to site-assets bucket
    const { data, error } = await supabase.storage
      .from('site-assets')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false, // Set to true if you want to overwrite existing files
      });

    if (error) {
      console.error('Error uploading image:', error);
      return { url: null, error };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('site-assets')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Unexpected error uploading image:', error);
    return {
      url: null,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param path - Path of the file in the bucket
 */
export async function deleteImage(path: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from('site-assets')
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Unexpected error deleting image:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}

