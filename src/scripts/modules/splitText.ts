import SplitType from 'split-type';

export default function setupTypeSplit(isOverflow?: boolean) {
    // TypeSplit setup main
    const typeSplit = new SplitType('.line-wrap', {
        types: 'lines',
        tagName: 'span',
        lineClass: 'js-title-line',
    });

    if(isOverflow){
        // TypeSplit setup lines
        const lines = document.querySelectorAll('.js-title-line');
        lines.forEach((line) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('line-overflow');

            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
        //
    }
}
