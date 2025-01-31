import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
import {IconProps} from 'react-native-vector-icons/Icon';

const LofftIcon = createIconSetFromIcoMoon(icoMoonConfig, 'IcoMoon', 'icomoon.ttf');

export default LofftIcon as unknown as React.FC<IconProps>;
