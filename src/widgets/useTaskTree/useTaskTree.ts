
const useNode = () => {
    //@ts-ignore
    const insertNode = function (tree, commentId, item) {
        if (tree.id === commentId) {
            tree.subtasks.push({
                id: new Date().getTime(),
                label: item,
                subtasks: [],
            });


            return tree;
        }

        let latestNode = [];
        latestNode = tree.subtasks.map((ob : any) => {
            return insertNode(ob, commentId, item);
        });

        return { ...tree, subtasks: latestNode };
    };

    //@ts-ignore
    const editNode = (tree, commentId, value) => {
        if (tree.id === commentId) {
            tree.label = value;
            return tree;
        }

        tree.subtasks.map((ob : any) => {
            return editNode(ob, commentId, value);
        });

        console.log(tree)

        return { ...tree };
    };

    //@ts-ignore
    const deleteNode = (tree, id) => {
        console.log(tree)
        for (let i = 0; i < tree.subtasks.length; i++) {
            const currentItem = tree.subtasks[i];
            if (currentItem.id === id) {
                tree.subtasks.splice(i, 1);
                return tree;
            } else {
                deleteNode(currentItem, id);
            }
        }
        return tree;
    };

    return { insertNode, editNode, deleteNode };
};

export default useNode;
