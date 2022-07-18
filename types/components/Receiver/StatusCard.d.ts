/// <reference types="react" />
export interface StatusCardProps {
    title: string;
    subtitle: string;
    buttonText: string;
    isLoading: boolean;
    loadingText?: string;
    isError: boolean;
    errorText?: string;
    noPeerAvailable?: boolean;
    onClick: () => void;
}
export default function StatusCard({ title, subtitle, buttonText, isLoading, loadingText, isError, errorText, noPeerAvailable, onClick, }: StatusCardProps): JSX.Element;
