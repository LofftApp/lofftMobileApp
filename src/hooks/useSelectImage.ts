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
  avatar?: SavedImage | null;
  mainFlatImage?: SavedImage | null;
};
export const useSelectImage = ({
  edit,
  userType,
  imageType,
  dbImages,
  displaySavedImages,
  avatar,
  mainFlatImage,
}: UseSelectImageProps) => {
  const {imagesToUpload, setSavedImages, selectedImage, setSelectedImage} =
    useImagesToUpload(imageType);

  useEffect(() => {
    if (edit && dbImages.length > 0) {
      setSavedImages({
        userType,
        imageType,
        images: dbImages,
        avatar: avatar || null,
        mainFlatImage: mainFlatImage || null,
      });
    }

    if (!edit && displaySavedImages.length > 0) {
      setSavedImages({
        userType,
        imageType,
        images: displaySavedImages,
        avatar: avatar || null,
        mainFlatImage: mainFlatImage || null,
      });

      if (selectedImage) {
        currentSelectionRef.current = selectedImage.uri;
        setSelectedImage(selectedImage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSelectionRef = useRef<string | null>(selectedImage?.uri || null);

  // Find an existing image in one of the lists
  const findImageByUri = useCallback(
    (uri: string) =>
      imagesToUpload.find(img => img.uri === uri) ||
      displaySavedImages.find(img => img.uri === uri),
    [imagesToUpload, displaySavedImages],
  );

  // Get the first available image
  const getDefaultImage = useCallback((): SelectedImage | null => {
    let defaultImage: SavedImage | null = null;

    const source =
      imagesToUpload.length > 0 ? ImageSource.Upload : ImageSource.Saved;
    if (edit) {
      !selectedImage
        ? (defaultImage = dbImages[0])
        : (defaultImage = displaySavedImages[0] || imagesToUpload[0]);
      if (edit && defaultImage && 'blobId' in defaultImage) {
        defaultImage = {
          uri: defaultImage.uri,
          source,
          userType,
          imageType,
          blobId: defaultImage.blobId,
        };
        return defaultImage ? defaultImage : null;
      }
    } else {
      defaultImage = imagesToUpload[0] || displaySavedImages[0];
    }

    return defaultImage
      ? {uri: defaultImage.uri, source, userType, imageType}
      : null;
  }, [
    imagesToUpload,
    displaySavedImages,
    dbImages,
    edit,
    selectedImage,
    userType,
    imageType,
  ]);

  useEffect(() => {
    // 1. If the selected image was deleted
    if (selectedImage && !findImageByUri(selectedImage.uri)) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }
    }

    // 2️  Image is upload but moved to saved
    if (selectedImage && selectedImage.source === ImageSource.Upload) {
      const savedImage = displaySavedImages.find(
        img => img.uri === selectedImage.uri,
      );
      if (savedImage) {
        const updatedImage: SelectedImage = {
          uri: savedImage.uri,
          source: ImageSource.Saved,
          userType,
          imageType,
        };
        currentSelectionRef.current = updatedImage.uri;
        setSelectedImage(updatedImage);
      }
    }

    // 3️ If no image is selected, select the default one
    if (!selectedImage) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }
    }

    // 4️ If no images are available at all
    if (imagesToUpload.length === 0 && displaySavedImages.length === 0) {
      setSelectedImage(null);
      currentSelectionRef.current = null;
    }
  }, [
    displaySavedImages,
    imagesToUpload,
    edit,
    selectedImage,
    setSelectedImage,
    findImageByUri,
    dbImages,
    imageType,
    userType,
    getDefaultImage,
  ]);

  return {
    currentSelectionRef,
  };
};
