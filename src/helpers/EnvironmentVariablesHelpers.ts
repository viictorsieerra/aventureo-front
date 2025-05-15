export enum EnvironmentVariablesEnum {
    API_URL = 'VITE_APP_API_URL',
}

export function getEnvironmentVariable(environmentVariableName: string): string {
    return import.meta.env[environmentVariableName] as string;
}
