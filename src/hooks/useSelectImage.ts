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
    useImagesToUpload();

  const getSelectedImage = useCallback(() => {
    if (userType === UserType.LESSOR) {
      return imageType === ImageType.User
        ? selectedImage?.lessor?.user
        : selectedImage?.lessor?.flat;
    }
    return selectedImage?.tenant?.user;
  }, [userType, imageType, selectedImage]);

  console.log ('getSelectedImage in use select hook', getSelectedImage());

  useEffect(() => {
    if (edit && dbImages.length > 0) {
      setSavedImages({
        userType,
        imageType,
        images: dbImages,
        avatar: avatar || null,
        mainFlatImage: mainFlatImage || null,
      });

      console.log('SelectedImage in use', selectedImage);
    }

    if (!edit && displaySavedImages.length > 0) {
      setSavedImages({
        userType,
        imageType,
        images: displaySavedImages,
        avatar: avatar || null,
        mainFlatImage: mainFlatImage || null,
      });
    }

    // setSelectedImage(null);
    // currentSelectionRef.current = null;

    console.log('Initial selected image:', getSelectedImage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSelectionRef = useRef<string | null>(selectedImage?.uri || null);

  // Find an existing image in one of the lists

  const findImageByUri = useCallback(
    (uri?: string) =>
      uri
        ? imagesToUpload.find(img => img.uri === uri) ||
          displaySavedImages.find(img => img.uri === uri)
        : null,
    [imagesToUpload, displaySavedImages],
  );

  // Get the first available image
  const getDefaultImage = useCallback((): SelectedImage | null => {
    let defaultImage: SavedImage | null = null;
    if (edit) {
      !selectedImage
        ? (defaultImage = dbImages[0])
        : (defaultImage = displaySavedImages[0] || imagesToUpload[0]);
      console.log('default images comes from dbImages', dbImages[0]);
    } else {
      defaultImage = imagesToUpload[0] || displaySavedImages[0];
      console.log(
        'default images comes from imagesToUpload',
        imagesToUpload[0],
      );
    }

    const source =
      imagesToUpload.length > 0 ? ImageSource.Upload : ImageSource.Saved;
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
    if (getSelectedImage() && !findImageByUri(getSelectedImage()?.uri)) {
      const defaultImage = getDefaultImage();
      if (defaultImage) {
        currentSelectionRef.current = defaultImage.uri;
        setSelectedImage(defaultImage);
      }

      console.log('Selected image was deleted – changing to:', defaultImage);
    }

    // 2️  Image is upload but moved to saved
    if (
      getSelectedImage() &&
      getSelectedImage()?.source === ImageSource.Upload
    ) {
      const savedImage = displaySavedImages.find(
        img => img.uri === getSelectedImage()?.uri,
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
        console.log('Selected image moved to saved images:', selectedImage);
      }
    }

    // 3️ If no image is selected, select the default one
    if (!selectedImage) {
      const defaultImage = getDefaultImage();
      console.log('defaultImage', defaultImage);
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
    dbImages,
    userType,
    imageType,
    getSelectedImage,
  ]);

  return {
    currentSelectionRef,
  };
};
