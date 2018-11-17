const counterSelector = '.counter'
const delay = 1000

// Prepare a few helper functions
const rangeToString = (first, last) =>
    Array.from(Array(last + 1 - first), (_, i) => first + i).join('')

const prependRanges = input =>
    rangeToString(0, 9).repeat(2) + input

const appendRanges = input =>
    input + rangeToString(0, 9).repeat(2)

const simulateRange = input =>
    input + '!$0a95xd'.repeat(2)

const randomOffset = () =>
    Math.floor(Math.random() * 16) + 5

// Initiate the spinners
Splitting({ target: counterSelector })

document.querySelectorAll(counterSelector).forEach(counter => {

    counter.querySelectorAll('.char').forEach(char => {

        let val = char.innerHTML,
                     before,
                     after,
                     offsetY = randomOffset() * 22

        char.style.setProperty('animation-delay', `${delay}ms`)

        if([',','.'].indexOf(val) !== -1) {
            char.style.setProperty('margin-left','-10px')
            char.style.setProperty('margin-right','-10px')
            before = after = ''
        } else if(/\D/.test(val)) {
            before = after = simulateRange(val)
        } else {
            n = Number(val)
            before = prependRanges(rangeToString(0, n - 1))
            after = appendRanges(rangeToString(n + 1, 9))
        }

        char.setAttribute('data-nbefore', before)
        char.setAttribute('data-nafter', after)

        setTimeout(() => {

            char.style.setProperty('top', `-${offsetY}px`)
            char.style.setProperty('transform',`translate3D(0, ${offsetY}px, 0)`)
            char.style.setProperty('color','#afe3ff')

            setTimeout(() => {
                char.style.setProperty('color','#4f6dc6')
            }, delay)

        }, delay)

    })

})
