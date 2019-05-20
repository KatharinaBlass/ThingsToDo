<template>
    <li class="entry">
        <label id="entryLabel">
            <input type="checkbox" :checked="checked"/>
            <span id="checkbox"></span>
            <span id="entryText">{{text}}</span>
        </label>
        <button id="entryCloseBtn">
            <img src="@/assets/close.svg" class="icon"/>
        </button>
    </li>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
.entry {
	display: flex;
	margin: 8px;
	cursor: pointer;
	position: relative;
	transition: 0.2s;
	background: white;
	align-items: center;

	&:last-child {
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
	}

	#entryLabel {
		flex: 1;
		padding: .5em;
        text-align: left;
	}

    #entryCloseBtn {
        display: none;
        padding: 0 .5em;
        border: none;
        background: none;
        cursor: pointer;

        &:last-of-type {
            border-bottom-right-radius: 2px;
        }
    }

	&:hover {
		background: #e7e7e7; /* #d1e2e5  #f7eaea */
		#entryCloseBtn {
			display: inline;
		}
	}
}

#checkbox {
	display: inline-block;
	position: relative;
	width: 10px;
    height: 10px;
    border: 1px solid #2e8b94;
    margin: 0 .3em;
}

input[type="checkbox"] {
	position: absolute;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);

	&:checked + #checkbox {
		background: #2e8b94;
		color: white;

		& + #entryText{
			color: #2e8b94;
			text-decoration: line-through;
		}

		&:before {
			content: '✔';
			position: absolute;
			font-size: .4em;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
.icon {
	display: block;
	height: 24px;
}
</style>

