package core

type TriviaError struct {
	IsTriviaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTriviaError(code string, msg string, ctx *Context) *TriviaError {
	return &TriviaError{
		IsTriviaError: true,
		Sdk:              "Trivia",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TriviaError) Error() string {
	return e.Msg
}
