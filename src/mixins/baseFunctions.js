export default {
    $_clearChildNodes(target) {
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }
    }
}