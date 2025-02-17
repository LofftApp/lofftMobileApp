import {useCallback, useEffect, useRef} from 'react';
//Hooks 🪝
import {useImagesToUpload} from 'reduxFeatures/imageHandling/useImagesToUpload';
import {UserType} from 'reduxFeatures/user/types';

//Types 🏷️
import {
  ImageRecord,
  ImageSource,
  ImageType,
  SavedImage,
  SelectedImage,
} from 'reduxFeatures/imageHandling/types';

type UseSelectImageProps = {
  edit: boolean;
  userType: UserType;
  imageType: ImageType;
  dbImages: ImageRecord[];
  displaySavedImages: SavedImage[];
};
export const useSelectImage = ({
  edit,
  userType,
  imageType,
  dbImages,
  displaySavedImages,
}: UseSelectImageProps) => {
  const {imagesToUpload, setSavedImages, selectedImage, setSelectedImage} =
    useImagesToUpload();

  useEffect(() => {
    if (edit && dbImages.length > 0) {
      setSavedImages({
        userType,
        imageType,
        images: dbImages,
      });

      console.log('SelectedImage in use', selectedImage);
    }

    if (!edit && displaySavedImages.length > 0) {
      setSavedImages({
        userType,
        imageType,
        images: displaySavedImages,
      });
      if (selectedImage) {
        currentSelectionRef.current = selectedImage.uri;
        setSelectedImage(selectedImage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track the currently selected index
  const currentSelectionIndexRef = useRef<number | null>(null);

  // Track the currently selected URI
  const currentSelectionRef = useRef<string | null>(selectedImage?.uri || null);

  // NEW USER MODE

  // Find an existing image in either list
  const findImageByUri = useCallback(
    (uri: string) =>
      imagesToUpload.find(img => img.uri === uri) ||
      displaySavedImages.find(img => img.uri === uri),
    [imagesToUpload, displaySavedImages],
  );

  // Get the first available image
  const getDefaultImage = useCallback((): SelectedImage | null => {
    const defaultImage = imagesToUpload[0] || displaySavedImages[0];
    const source =
      imagesToUpload.length > 0 ? ImageSource.Upload : ImageSource.Saved;
    return defaultImage ? {uri: defaultImage.uri, source} : null;
  }, [imagesToUpload, displaySavedImages]);

  useEffect(() => {
    if (edit) {
      return;
    }

    // 1. If the selected image was deleted
    if (selectedImage && !findImageByUri(selectedImage.uri)) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }

      console.log('Selected image was deleted – defaulting to:', defaultImage);
    }

    // 2️  If the selected image is still in the uploads but now saved
    if (selectedImage && selectedImage.source === 'upload') {
      const savedImage = displaySavedImages.find(
        img => img.uri === selectedImage.uri,
      );
      if (savedImage) {
        // Image has moved to saved images; update source
        const updatedImage: SelectedImage = {
          uri: savedImage.uri,
          source: ImageSource.Saved,
        };
        currentSelectionRef.current = updatedImage.uri;
        setSelectedImage(updatedImage);
        console.log('Selected image moved to saved images:', selectedImage);
      }
    }

    // 3️ If no image is selected, select the default one
    if (!selectedImage) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }
      console.log('No image selected – defaulting to:', defaultImage);
    }

    // 4️ If no images are available at all
    if (imagesToUpload.length === 0 && displaySavedImages.length === 0) {
      setSelectedImage(null);
      currentSelectionRef.current = null;
      console.log('No images available – selection cleared');
    }
  }, [
    displaySavedImages,
    imagesToUpload,
    edit,
    selectedImage,
    setSelectedImage,
    findImageByUri,
    getDefaultImage,
  ]);

  //EDIT MODE
  useEffect(() => {
    if (!edit) {
      return;
    }

    // 1. Handle selected image deletion
    const currentIndex = displaySavedImages.findIndex(
      img => img.uri === currentSelectionRef.current,
    );

    if (displaySavedImages.length > 0) {
      if (currentIndex === -1) {
        const newIndex = Math.min(
          currentSelectionIndexRef.current ?? 0,
          displaySavedImages.length - 1,
        );
        const newSelected = displaySavedImages[newIndex] as ImageRecord;
        setSelectedImage({
          uri: newSelected.uri,
          source: ImageSource.Saved,
          blobId: newSelected.blobId,
        });
        currentSelectionRef.current = newSelected.uri;
        currentSelectionIndexRef.current = newIndex;
      } else {
        currentSelectionIndexRef.current = currentIndex;
      }
    }

    // 2. Select first uploaded image if no saved images exist
    if (displaySavedImages.length === 0 && imagesToUpload.length > 0) {
      const firstUploaded = imagesToUpload[0];
      currentSelectionRef.current = firstUploaded.uri;
      setSelectedImage({
        uri: firstUploaded.uri,
        source: ImageSource.Upload,
      });
    }

    // 3. If all images are gone, clear selection
    if (imagesToUpload.length === 0 && displaySavedImages.length === 0) {
      setSelectedImage(null);
      currentSelectionRef.current = null;
      console.log('SelectedImage cleared');
    }
  }, [imagesToUpload, displaySavedImages, edit, setSelectedImage]);

  return {
    currentSelectionRef,
    currentSelectionIndexRef,
  };
};
