    const isArray = (_) => [_.map, _.reduce, _.length].every(predicate => predicate)
    const spaces = (n) => ' '.repeat(n)
    const types = {
        NUMBER: 'number',
        ARRAY: 'array', 
        OBJECT: 'object',
        STRING: 'string',
        BOOLEAN: 'boolean'
    }

    const getType = (node) => {
        if (isArray(node)) {
            return types.ARRAY
        }

        if (typeof node === types.NUMBER) {
            return types.NUMBER
        }

        if (typeof node === types.STRING) {
            return types.STRING
        }

        if (typeof node === types.BOOLEAN) {
            return types.BOOLEAN
        }

        if (typeof node === types.OBJECT) {
            return types.OBJECT
        }
    }

    const format = (node, indent = 4) => {
        let template = ''
        let type = getType(node)

        if (type === types.OBJECT) {
            template += '{' + '\n'
            template += Object.keys(node).map((key) => {
                let childNode = node[key]

                return `${spaces(indent)}<span   class="json-key">"${key}"</span>:    ${format(childNode,indent + 4)}`
            }).join(',\n')

            template += '\n' + spaces(indent - 4) +'}'
        }

        if (type === types.ARRAY) {
            template += '[' + '\n'
            template += node.map(childNode => spaces(indent) + format(childNode,indent + 4)).join(',\n')
            template += '\n' + spaces(indent - 4) + ']'
            return template
        }

        if (type === types.STRING) {
            return `<span class="json-string">"${node}"</span>`
        }
        if (type === types.NUMBER) {
            return `<span class="json-number">${node}</span>`
        }
        if (type === types.BOOLEAN) {
            return `<span class="json-boolean">${node}</span>`
        }


        return template
        
    }