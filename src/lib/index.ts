
export function toId(text: any) {
    if (text && text.id) {
        text = text.id;
    }
    if (typeof text !== 'string' && typeof text !== 'number') return '';
    return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
}
export {Net} from './net';