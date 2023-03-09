import moment, { Moment } from 'moment'
import { DayPickerRangeController, FocusedInputShape } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import { ISearchBy, ISearchByOpts } from '../interfaces/search'

interface IDatePickerProps {
    activeModule: string
    searchBy: ISearchBy
    onSetSearchBy: (searchBy: ISearchByOpts) => void
    onChangeModule: (moduleName: string | null) => void
}

export function DatePicker({ searchBy, onSetSearchBy, activeModule, onChangeModule }: IDatePickerProps) {
    //
    const handleDatesChange = ({ startDate, endDate }: { startDate: Moment | null; endDate: Moment | null }): void => {
        let end = endDate?.toDate()
        let start = startDate?.toDate()
        onSetSearchBy({ startDate: start, endDate: end })
    }
    //
    const handleFocusChange = (newFocus: FocusedInputShape | null) => {
        if (!newFocus) {
            onChangeModule('guests')
            return
        }
        onChangeModule(newFocus)
    }

    return (
        <section className='datepicker'>
            <DayPickerRangeController
                startDate={searchBy.startDate ? moment(searchBy.startDate) : null}
                endDate={searchBy.endDate ? moment(searchBy.endDate) : null}
                onDatesChange={handleDatesChange}
                focusedInput={(activeModule as FocusedInputShape) || 'startDate'}
                onFocusChange={handleFocusChange}
                numberOfMonths={2}
                minimumNights={1}
                // keepOpenOnDateSelect={true}
                hideKeyboardShortcutsPanel={true}
                initialVisibleMonth={() => moment()}
            />
        </section>
    )
}