export const baseRules: Rules = {
    required: (v: any) => !!v || 'Field is required',
    strMin1: (v: any) => (v && v.length >= 0) || 'Field must be more than 0 characters',
    strMax255: (v: any) => (v && v.length <= 45) || `Field must be less than 255 characters`,
    min1: (v: any) => (v && v >= 0) || `Min: 1`,
    max10: (v: any) => (v && v >= 0) || `Min: 1`,
};

export interface Rules {
    [key: string]: (v: any) => void | undefined;
}
