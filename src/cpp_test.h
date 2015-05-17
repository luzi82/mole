#ifndef __cpp_test_h__
#define __cpp_test_h__

#include "cocos2d.h"

class CppTest : public cocos2d::Ref
{
public:
	CppTest();
	~CppTest();
	
	bool init();
	
	std::string helloMsg();
	
	CREATE_FUNC(CppTest);
};

// __cpp_test_h__
#endif
