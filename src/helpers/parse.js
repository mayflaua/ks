const info = [
    {
        "type": "text",
        "code": "number",
        "alias": "1",
        "title": "Номер:"
    },
    {
        "type": "date",
        "code": "date",
        "alias": "1",
        "title": "Дата:",
        "required": "true"
    },
    {
        "type": "date",
        "code": "date_exec",
        "alias": "1",
        "title": "Дата проводки:"
    },
    {
        "type": "text",
        "code": "account1",
        "alias": "1",
        "title": "Счет отправителя:",
        "required": "true",
        "suggestions": "true"
    },
    {
        "type": "text",
        "code": "corr1_n",
        "alias": "1",
        "title": "Наименование отправителя:"
    },
    {
        "type": "text",
        "code": "corr2_n",
        "alias": "2",
        "title": "Корреспондент:"
    },
    {
        "type": "text",
        "code": "inc_n",
        "alias": "2",
        "title": "Наим. дохода:"
    },
    {
        "type": "grid",
        "code": "",
        "alias": "2",
        "title": ""
    }
]

const grid = ['№', 'Сумма','Счет получателя', 'Дт', 'Кт']

const parseXML = (xml) => {
    const res = {
        margin: null,
        rows: [],
    }
    // parse column margin
    res.margin = xml.querySelector('Layout').attributes.firstmargin.value

    const rows = xml.querySelectorAll("row")

    for (const row of rows) {
        if (row.attributes.type && row.attributes.type.value === 'row') {
            // parse if row has multiple nodes
            const rowEls = []
            const els = row.querySelectorAll('el')
            for (const el of els) {
                const rowEl = {}
                const [...attrs] = el.attributes
                for (const attr of attrs) {
                    if (attr.name === 'field') {
                        // split {field: "alias.name"} to {alias: alias, field: 'name'}
                        const [alias, field] = attr.value.split('.')
                        rowEl.alias = alias
                        rowEl.field = field
                    } else {
                        rowEl[attr.name] = attr.value
                    }

                    rowEl.type = info.find(o => o.code === rowEl.field)?.type
                    rowEl.labelText = info.find(o => o.code === rowEl.field)?.title
                    rowEl.required = info.find(o => o.code === rowEl.field)?.required
                    rowEl.suggestions = info.find(o => o.code === rowEl.field)?.suggestions
                }
                rowEls.push(rowEl)
            }
            res.rows.push(rowEls)
        } else {
            // parse if row is single node
            const rowEl = {}
            const [...attrs] = row.attributes
            for (const attr of attrs) {
                if (attr.name === 'field') {
                    const [alias, field] = attr.value.split('.')
                    rowEl.alias = alias
                    rowEl.field = field
                } else {
                    rowEl[attr.name] = attr.value
                }
                if (!rowEl.type) {
                    rowEl.type = info.find(o => o.code === rowEl.field)?.type
                }
                rowEl.labelText = info.find(o => o.code === rowEl.field)?.title
                rowEl.required = info.find(o => o.code === rowEl.field)?.required
                rowEl.suggestions = info.find(o => o.code === rowEl.field)?.suggestions
            }
            res.rows.push([rowEl])
        }
    }
    res.grid = grid
    const suggestionsList = []

    // eslint-disable-next-line no-unused-vars
    for (const _ of Array(10).keys()) {
        const name = Math.floor(Math.random()*100000000)
        const num = String(Math.floor(Math.random()*10000))
        suggestionsList.push({[name]: num})
    }
    res.suggestionsList = suggestionsList

    return res
}

export default parseXML
