/// <reference types="react" />
interface AvatarProps {
    address?: string | undefined;
    size?: 'small' | 'medium' | 'large';
}
export default function Avatar(props: AvatarProps): JSX.Element;
export {};
